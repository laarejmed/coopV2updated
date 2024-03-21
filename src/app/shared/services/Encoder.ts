import { HttpUrlEncodingCodec } from "@angular/common/http";

class CustomHttpUrlEncodingCodec extends HttpUrlEncodingCodec {
  encodeValue(value: string): string {
    return super.encodeValue(value).replace('/', '%2F');
  }

  decodeValue(value: string): string {
    return super.decodeValue(value.replace('%2F', '/'));
  }
}
