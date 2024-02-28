import dotenv from "dotenv";
import crypto from "crypto";
import { Buffer } from 'buffer';
dotenv.config();
const algorithm = 'aes-256-ctr';
const ENCRYPTION_KEY = Buffer.from(process.env.CIPHERKEY, 'base64');
const IV_LENGTH = 16;

export function encrypt(pass) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let encrypted = cipher.update(pass);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(pass) {
    debugger;
    let textParts = pass.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
    
}

export const errorHandler =(statusCode, message)=>{
    const error = new Error();
    error.statusCode= statusCode;
    error.message = message;
    return error;

}