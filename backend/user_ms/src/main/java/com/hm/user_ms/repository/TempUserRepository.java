package com.hm.user_ms.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.hm.user_ms.entity.TempUser;

 public interface TempUserRepository extends CrudRepository<TempUser,Long>{

    Optional<TempUser> findByEmail(String email);


} 
