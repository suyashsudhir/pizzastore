package com.example.pizzabackend.pizzabackend.repository;

import com.example.pizzabackend.pizzabackend.models.UserInformation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserInformationRepository extends MongoRepository<UserInformation, String> {

    UserInformation findUserInformationByEmail(String email);
    //@Query(value = "update user_info set profile_picture=?1, fullname=?2, address=?3, phone=?4 where id=?0;",allowFiltering = true)
    @Query("db.user_info.updateOne({email:?0},{$set:{profile_picture:?1,fullname:?2, address:?3, phone:?4}})")
    void updateUserInformation(@Param("email") String email, @Param("profileUrl") String profileUrl, @Param("name") String name, @Param("address") String address, @Param("phone") String phone);


}
