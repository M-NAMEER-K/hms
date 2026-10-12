package com.hm.media_ms.entity;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@NoArgsConstructor 
@AllArgsConstructor 
@Entity 
@Builder 
public class MediaFile {
    
    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String type;

    private Long size;

    @Lob 
    private byte[] data;

    private Storage storage;

    @CreationTimestamp 
    private LocalDateTime createdAt;

    public MediaFile setName(String name){
         this.name=name;
         return this;
    }

    public MediaFile setType(String type){
        this.type=type;
        return this;
    }

   
}
