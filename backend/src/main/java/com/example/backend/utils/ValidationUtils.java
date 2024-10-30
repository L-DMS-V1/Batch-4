package com.example.backend.utils;

import java.util.List;

public class ValidationUtils {
    public static boolean isEmptyField(String s){
        return s == null || s.trim().isEmpty();
    }
    public static boolean isEmptyField(Integer i){
        return (i == null || i==0);
    }
    public static boolean isEmptyField(List list){
        return (list.size() == 0);
    }
}
