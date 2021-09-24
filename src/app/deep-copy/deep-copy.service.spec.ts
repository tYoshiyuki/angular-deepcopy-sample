import { TestBed } from '@angular/core/testing';

import { DeepCopyService } from './deep-copy.service';

/**
 * テスト用のデータモデルです。
 */
interface TestModel {
  numberValue: number;
  stringValue: string;
  dateValue: Date;
  listValue: string[];
  nestedObject: TestModel;
  nestedListObject: TestModel[];
}

/**
 * テスト用データモデルのアサート関数です。
 * @param val1
 * @param val2
 */
function assertTestModel(val1: TestModel, val2: TestModel) {
  expect(val1.numberValue).toEqual(val2.numberValue);
  expect(val1.stringValue).toEqual(val2.stringValue);
  expect(val1.dateValue).toEqual(val2.dateValue);
  expect(val1.listValue).toEqual(val2.listValue);
}

describe('DeepCopyService', () => {
  let service: DeepCopyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeepCopyService);
  });

  it('初期化出来ること。', () => {
    expect(service).toBeTruthy();
  });

  describe('deepCopy', () => {
    it('正常にディープコピー出来ること。', () => {
      const target = {
        numberValue: 1,
        stringValue: 'あいう',
        dateValue: new Date(),
        listValue: ['あ', 'い', 'う'],
        nestedObject: {
          numberValue: 2,
          stringValue: 'かきく',
          dateValue: new Date(),
          listValue: ['か', 'き', 'く'],
        } as TestModel,
        nestedListObject: [
          {
            numberValue: 3,
            stringValue: 'さしす',
            dateValue: new Date(),
            listValue: ['さ', 'し', 'す'],
          } as TestModel,
          {
            numberValue: 4,
            stringValue: 'たちつ',
            dateValue: new Date(),
            listValue: ['た', 'ち', 'つ'],
          } as TestModel,
        ]
      } as TestModel;

      const result = service.deepCopy<TestModel>(target);

      assertTestModel(target, result);
      assertTestModel(target.nestedObject, result.nestedObject);
      assertTestModel(target.nestedListObject[0], result.nestedListObject[0]);
      assertTestModel(target.nestedListObject[1], result.nestedListObject[1]);

      // @note ディープコピーのため参照を共有していないことを確認します。
      target.numberValue = 999;
      target.stringValue = 'わをん';
      target.dateValue = new Date();
      target.listValue = ['わ', 'を', 'ん']

      expect(target.numberValue).not.toEqual(result.numberValue);
      expect(target.stringValue).not.toEqual(result.stringValue);
      expect(target.dateValue).not.toEqual(result.dateValue);
      expect(target.listValue).not.toEqual(result.listValue);
    })
  })
});
