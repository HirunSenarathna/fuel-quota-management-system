package com.fqms.fuelquotamanagementsystem.shared.exceptions;

public class RecordAlreadyExistException extends GeneralException{
    public RecordAlreadyExistException(String message) {
        super(400, message);
    }
}
