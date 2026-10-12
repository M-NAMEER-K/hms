package  com.hm.user_ms.entity;

import java.time.LocalDateTime;

import  com.hm.user_ms.dto.Roles;
import  com.hm.user_ms.dto.UserDto;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor 
@NoArgsConstructor 
@Getter
@Setter 
@Entity 
 public class User{
         
   @Id 
@GeneratedValue(strategy = GenerationType.IDENTITY)
Long id;
    private String name;
    private String email;
    private String password;
    
    @Enumerated(EnumType.STRING)
    private Roles role;
    private Long profileId;

    private String resetToken;

    private LocalDateTime resetTokenExpiry;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
       
    public UserDto toDto(){
      return new UserDto(this.id,this.name,this.email,this.password,null,this.role,this.profileId,this.resetToken,this.resetTokenExpiry,this.createdAt,this.updatedAt);
    }

        @PrePersist
     protected void PrePersist(){
        LocalDateTime now=LocalDateTime.now();
        this.createdAt=now;
        this.updatedAt=now;
     }

     @PreUpdate
     protected void PreUpdate(){
        this.updatedAt=LocalDateTime.now();
     }
     
}