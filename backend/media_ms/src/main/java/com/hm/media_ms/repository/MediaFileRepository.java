package com.hm.media_ms.repository;

import org.springframework.data.repository.CrudRepository;

import com.hm.media_ms.entity.MediaFile;

public interface MediaFileRepository extends CrudRepository<MediaFile , Long> {
    
}
