package com.example.bookstoreserver.exceptions;

public class DataIntegrityViolationException extends Exception{
    public DataIntegrityViolationException(String msg) {
        super(msg);
    }
}
