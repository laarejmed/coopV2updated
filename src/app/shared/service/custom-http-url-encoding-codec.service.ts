import { HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CustomHttpUrlEncodingCodecService extends HttpUrlEncodingCodec{
  override encodeValue(value: string): string {
      return super.encodeValue(value).replace('/','%2F');
  }
  override decodeValue(value: string): string {
      return super.decodeValue(value.replace('%2F','/'));
  }
}