package com.hm.media_ms.api;


import java.io.IOException;
import java.util.Optional;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.hm.media_ms.dto.MediaFileDto;
import com.hm.media_ms.entity.MediaFile;
import com.hm.media_ms.exception.MediaException;
import com.hm.media_ms.service.MediaService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/media")
@RequiredArgsConstructor
public class MediaApi {


    private final MediaService mediaService;



    @PostMapping("/upload")
    public ResponseEntity<MediaFileDto> uploadFile(@RequestParam("file") MultipartFile file) throws IOException, MediaException {


        MediaFileDto mediaFileDto =mediaService.storeFile(file);


        return ResponseEntity.ok(mediaFileDto);
    }

    @PutMapping("/replace/{oldMediaId}")
public ResponseEntity<MediaFileDto> replaceFile( @PathVariable Long oldMediaId, @RequestParam("file") MultipartFile file) throws IOException, MediaException {


    MediaFileDto response =  mediaService.replaceFile(oldMediaId,file);


    return ResponseEntity.ok(response);

}


@GetMapping("/{id}")
public ResponseEntity<String> getFile(@PathVariable Long id)
{

MediaFile file =mediaService.getFile(id).orElseThrow();


return ResponseEntity.ok(file.getUrl());

}

    @DeleteMapping("/{id}")
       public ResponseEntity<String> deleteFile(@PathVariable Long id) throws MediaException {
        mediaService.deleteFile(id);

    return ResponseEntity.ok("File deleted successfully");
}

}