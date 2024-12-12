package com.shpark.bookapp.domain;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    private int mno;

    private String username, password;

    private boolean delFlag;
}
