import { Injectable } from '@angular/core';

function _window():any{
  //return native window object in browser
  return window;
}

function _document():any{
  //return native document object in browser
  return document;
}

@Injectable()
export class WindowRefService {
  get nativeWindow(): any{
    return _window();
  }
}

@Injectable()
export class DocumentRefService {
  get nativeDocument(): any{
    return _document();
  }
}
