import clone from 'clone';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeepCopyService {
  /**
   * オブジェクトのディープコピーを行います。
   *
   * @param target
   * @returns オブジェクトのコピー
   */
  public deepCopy<T>(target: T): T {
    return clone<T>(target);
  }
}
