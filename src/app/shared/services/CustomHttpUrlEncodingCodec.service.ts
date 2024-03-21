import { HttpUrlEncodingCodec } from "@angular/common/http";

export class CustomHttpUrlEncodingCodec extends HttpUrlEncodingCodec {
  encodeValue(value: string): string {
    return super.encodeValue(value).replace('a', 'b');
  }

  decodeValue(value: string): string {
    return super.decodeValue(value.replace('b', 'a'));
  }
}
