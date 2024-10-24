package com.example.backend.utils;

public class ValidationUtils {
    public static boolean isEmptyField(String s){
        return s == null || s.trim().isEmpty();
    }
}
