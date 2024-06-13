package com.example.bookstoreserver.exceptions;

public class ConfirmEmailExpired extends Exception{
    public ConfirmEmailExpired(String msg){
        super(msg);
    }
}
