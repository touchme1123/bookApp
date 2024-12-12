package com.shpark.bookapp.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "imageList")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bno;

    @NonNull
    private String title;

    private String author, info;

    private int quantity, price;

    private boolean delFlag;

    @ElementCollection
    @Builder.Default
    private List<BookImage> imageList = new ArrayList<>();

    public void addImage(BookImage image) {
        image.setOrd(imageList.size());
        imageList.add(image);

    }

    public void addImageString(String fileName) {
        BookImage bookImage = BookImage.builder()
                .fileName(fileName)
                .build();

        addImage(bookImage);
    }

    public void clearList() {
        this.imageList.clear();
    }
}
