package com.hm.media_ms.service;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;
import com.hm.media_ms.repository.MediaFileRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.hm.media_ms.dto.MediaFileDto;
import com.hm.media_ms.entity.Storage;
import com.hm.media_ms.exception.MediaException;

import org.springframework.web.multipart.MultipartFile;
import com.hm.media_ms.entity.MediaFile;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class MediaServiceImpl implements MediaService {
       
    private final MediaFileRepository mediaFileRepository;
    private final Cloudinary cloudinary;

@Override
public MediaFileDto storeFile(MultipartFile file) throws IOException, MediaException{

    // Empty file check
    if(file.isEmpty()){
        throw new MediaException("FILE_EMPTY",  HttpStatus.BAD_REQUEST);
    }



    // Size validation 10MB

    long maxSize = 10 * 1024 * 1024;


    if(file.getSize() > maxSize){

        throw new MediaException("FILE_SIZE_EXCEEDS_10MB",HttpStatus.CONTENT_TOO_LARGE);
    }




    // Type validation

    String contentType = file.getContentType();



    if(contentType == null || !(contentType.equals("image/jpg")||contentType.equals("image/jpeg")|| contentType.equals("image/png"))){
             throw new MediaException(    "ONLY_JPG_JPEG_PNG_ALLOWED", HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
   
    

  Map<String,Object> uploadResult =
        cloudinary.uploader()
                  .upload( file.getBytes(),  ObjectUtils.emptyMap() );

    String cloudinaryUrl = uploadResult.get("secure_url").toString();


String publicId =uploadResult.get("public_id").toString();
    MediaFile mediaFile =
            MediaFile.builder()

            .name(file.getOriginalFilename())

            .type(file.getContentType())

            .size(file.getSize())

          .url(cloudinaryUrl)
         .publicId(publicId)
         .storage(Storage.CLOUDINARY)

            .build();



    MediaFile savedFile = mediaFileRepository.save(mediaFile);



   return MediaFileDto.builder()

        .id(savedFile.getId())
        .name(savedFile.getName())
        .type(savedFile.getType())
        .size(savedFile.getSize())
        .url(savedFile.getUrl())
        .storage(savedFile.getStorage())
        .createdAt(savedFile.getCreatedAt())
        .build();

}
    @Override 
           public Optional<MediaFile> getFile(Long id){
      return mediaFileRepository.findById(id);
           }

 @Override
public void deleteFile(Long id) throws MediaException {

    MediaFile mediaFile = mediaFileRepository.findById(id)
            .orElseThrow(() -> new MediaException("MEDIA_NOT_FOUND",   HttpStatus.NOT_FOUND));

    try {

        cloudinary.uploader()
                  .destroy( mediaFile.getPublicId(), ObjectUtils.emptyMap()
        );

    } catch (IOException e) {

        throw new MediaException("CLOUDINARY_DELETE_FAILED",  HttpStatus.BAD_GATEWAY);

    }

    mediaFileRepository.delete(mediaFile);
}

   @Override
public MediaFileDto replaceFile(Long oldMediaId, MultipartFile file)throws IOException, MediaException {


    // Delete old image first
    if(oldMediaId != null){

        MediaFile oldFile = mediaFileRepository.findById(oldMediaId)
                .orElseThrow(() -> 
                    new MediaException(
                        "OLD_MEDIA_NOT_FOUND",
                        HttpStatus.NOT_FOUND
                    )
                );


        try {

            cloudinary.uploader()
                    .destroy(
                        oldFile.getPublicId(),
                        ObjectUtils.emptyMap()
                    );


        } catch(IOException e){

            throw new MediaException(
                    "OLD_IMAGE_DELETE_FAILED",
                    HttpStatus.BAD_GATEWAY
            );

        }


        mediaFileRepository.delete(oldFile);
    }



    // Upload new image

    return storeFile(file);

}
}
