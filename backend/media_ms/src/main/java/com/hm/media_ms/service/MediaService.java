package com.hm.media_ms.service;

import java.io.IOException;
import java.util.Optional;
import com.hm.media_ms.entity.MediaFile;
import com.hm.media_ms.exception.MediaException;
import com.hm.media_ms.dto.MediaFileDto;
import org.springframework.web.multipart.MultipartFile;

public interface MediaService {
       public MediaFileDto storeFile(MultipartFile file) throws IOException,MediaException;
       public Optional<MediaFile> getFile(Long id);
       public void deleteFile(Long id) throws MediaException;
}
