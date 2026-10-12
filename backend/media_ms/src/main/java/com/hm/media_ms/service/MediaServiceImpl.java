package com.hm.media_ms.service;

import java.io.IOException;
import java.util.Optional;
import com.hm.media_ms.repository.MediaFileRepository;
import org.springframework.stereotype.Service;
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

@Override
public MediaFileDto storeFile(MultipartFile file) throws IOException, MediaException{

    // Empty file check
    if(file.isEmpty()){
        throw new MediaException("FILE_EMPTY");
    }



    // Size validation 10MB

    long maxSize = 10 * 1024 * 1024;


    if(file.getSize() > maxSize){

        throw new MediaException("FILE_SIZE_EXCEEDS_5MB");
    }




    // Type validation

    String contentType = file.getContentType();



    if(contentType == null || !(contentType.equals("image/jpg")||contentType.equals("image/jpeg")|| contentType.equals("image/png"))){
             throw new MediaException(    "ONLY_JPG_JPEG_PNG_ALLOWED");
    }



    MediaFile mediaFile =
            MediaFile.builder()

            .name(file.getOriginalFilename())

            .type(file.getContentType())

            .size(file.getSize())

            .data(file.getBytes())

            .storage(Storage.DB)

            .build();



    MediaFile savedFile = mediaFileRepository.save(mediaFile);



    return MediaFileDto.builder()

            .id(savedFile.getId())

            .name(savedFile.getName())

            .type(savedFile.getType())

            .size(savedFile.getSize())

            .build();

}
    @Override 
           public Optional<MediaFile> getFile(Long id){
      return mediaFileRepository.findById(id);
           }

    @Override
public void deleteFile(Long id) throws MediaException{

    MediaFile mediaFile = mediaFileRepository.findById(id).orElseThrow(  () -> new MediaException("MEDIA_NOT_FOUND"));


    mediaFileRepository.delete(mediaFile);

}
}
