package com.hm.media_ms.dto;

import java.time.LocalDateTime;


import com.hm.media_ms.entity.Storage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
@Builder 
public class MediaFileDto {
        private Long id;
    
    private String name;
    private String type;

    private Long size;

    private byte[] data;

    private Storage storage;
    private LocalDateTime createdAt;

    
}
