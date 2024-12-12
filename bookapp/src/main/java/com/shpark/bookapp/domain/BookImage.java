package com.shpark.bookapp.domain;


import jakarta.persistence.Embeddable;
import lombok.*;

@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class BookImage {

    private String fileName;

    private int ord;

    public void setOrd(int ord) {
        this.ord = ord;
    }
}
