package com.example.bookstoreserver.service.email;

public interface IEmailService {
    void sendConfirmEmail(String email);
    boolean confirmEmail(String confirmCode) throws Exception;
}
