package  com.hm.user_ms.dto;

import java.time.LocalDateTime;

import  com.hm.user_ms.entity.User;

import jakarta.persistence.Column;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor 
@NoArgsConstructor 
@Getter 
@Setter 
public class UserDto {
       
      Long id;

    @NotBlank(message="Name is mandatory") 
    private  String name;

    @NotBlank(message="Email is mandatory")
    @Email(message="Email should be valid")
    private String email;

    @NotBlank(message="Password is mandatory")
    @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W]).{8,15}$",
             message="Password should contain atleast 1 uppercase , 1 lowercase , 1 digit and 1 special character,min 8 char and max 15 characters")
    private String password;
    
     @NotBlank(message = "Confirm password is mandatory")
         @Pattern(regexp = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W]).{8,15}$",
             message="Password should contain atleast 1 uppercase , 1 lowercase , 1 digit and 1 special character,min 8 char and max 15 characters")
    private String confirmPassword;
    private Roles role;
    private Long profileId;
   private String resetToken;

    private LocalDateTime resetTokenExpiry;
   

    @Column(updatable =false,nullable=false)
    private LocalDateTime createdAt;

    @Column(nullable=false)
    private LocalDateTime updatedAt;

     public User toEntity(){
        return new User(this.id,this.name,this.email,this.password,this.role,this.profileId ,this.resetToken,this.resetTokenExpiry, this.createdAt , this.updatedAt);
     }

 
}
