import { NEW_POINT } from '../common/consts';

export default class PointEntity {
  #dateFrom;
  #dateTo;
  #destination;
  #isFavorite;
  #offers;
  #basePrice;
  #type;
  #id;

  constructor(data = {}) {
    const mergedData = {
      ...NEW_POINT,
      ...data,
    };

    this.#id = mergedData.id ?? new Date().toISOString();
    this.#basePrice = mergedData.basePrice;
    this.#dateFrom = mergedData.dateFrom;
    this.#dateTo = mergedData.dateTo;
    this.#destination = mergedData.destination;
    this.#isFavorite = mergedData.isFavorite;
    this.#offers = (mergedData.offers ?? []).map(String);
    this.#type = mergedData.type;
  }

  get id() {
    return this.#id;
  }

  get basePrice() {
    return this.#basePrice;
  }

  get dateFrom() {
    return this.#dateFrom;
  }

  get dateTo() {
    return this.#dateTo;
  }

  get destination() {
    return this.#destination;
  }

  get isFavorite() {
    return this.#isFavorite;
  }

  get offers() {
    return [...this.#offers];
  }

  get type() {
    return this.#type;
  }

  get data() {
    const data = {
      basePrice: this.#basePrice,
      dateFrom: this.#dateFrom,
      dateTo: this.#dateTo,
      destination: this.#destination,
      isFavorite: this.#isFavorite,
      offers: [...this.#offers],
      type: this.#type,
      id: this.#id,
    };

    return data;
  }

  updateData(newData = {}) {
    return new PointEntity({ ...this.data, ...newData });
  }

  toggleFavorite() {
    return this.updateData({ isFavorite: !this.#isFavorite });
  }

  setType(newType) {
    return this.updateData({ type: newType, offers: [] });
  }

  toggleOffer(offerId) {
    const id = String(offerId);
    const hasOffer = this.#offers.includes(id);
    const newOffers = hasOffer
      ? this.#offers.filter((item) => item !== id)
      : [...this.#offers, id];
    return this.updateData({ offers: newOffers });
  }

  setDestination(destinationId) {
    return this.updateData({ destination: destinationId });
  }
}
