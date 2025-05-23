package com.fqms.fuelquotamanagementsystem.service;

public interface SmsService {

    boolean sendSms(String phoneNumber, String message);
}
