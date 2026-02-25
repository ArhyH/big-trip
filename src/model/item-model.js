import { getRandomArrayElement } from '../common/helpers';
import { items } from '../mock/items';

const ITEM_COUNT = 3;

export default class ItemModel {
  items = Array.from({ length: ITEM_COUNT }, () =>
    getRandomArrayElement(items),
  );

  getItems() {
    return this.items;
  }
}
