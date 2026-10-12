package  com.hm.user_ms.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.hm.user_ms.dto.MonthlyRoleCountDto;
import com.hm.user_ms.dto.Roles;
import  com.hm.user_ms.entity.User;

       
    public interface UserRepository extends CrudRepository<User , Long>{
       
        Optional<User>findByEmail(String email);
        @Query("SELECT new com.hm.user_ms.dto.MonthlyRoleCountDto( CAST(FUNCTION('MONTHNAME', a.createdAt) as String), COUNT(a)) FROM User a WHERE a.role=?1 AND YEAR(a.createdAt)=YEAR(CURRENT_DATE) GROUP BY FUNCTION('MONTH',a.createdAt),CAST(FUNCTION('MONTHNAME',a.createdAt) as String) ORDER BY FUNCTION('MONTH',a.createdAt)")
        List<MonthlyRoleCountDto> countRegisterationsByRoleGroupedByMonth(Roles role);

        Optional<User> findByResetToken(String token);
        
    }

