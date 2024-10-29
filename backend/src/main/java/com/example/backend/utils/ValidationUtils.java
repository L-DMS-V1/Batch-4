package com.example.backend.utils;

public class ValidationUtils {
    public static boolean isEmptyField(String s){
        return s == null || s.trim().isEmpty();
    }
    public static boolean isEmptyField(Integer i){
        return (i == null || i==0);
    }
}
