import ApiService from '../framework/api-service';

const Method = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

const Url = {
  POINTS: 'points',
  DESTINATIONS: 'destinations',
  OFFERS: 'offers',
};

export default class PointsApiService extends ApiService {
  #adapterService = null;

  constructor({ endPoint, authorization, adapterService }) {
    super(endPoint, authorization);
    this.#adapterService = adapterService;
  }

  get points() {
    return this._load({ url: Url.POINTS })
      .then(ApiService.parseResponse)
      .then((points) =>
        points.map((point) => this.#adapterService.adaptToClient(point)),
      );
  }

  get destinations() {
    return this._load({ url: Url.DESTINATIONS })
      .then(ApiService.parseResponse)
      .then((destinations) =>
        destinations.map((destination) =>
          this.#adapterService.adaptToClient(destination),
        ),
      );
  }

  get offers() {
    return this._load({ url: Url.OFFERS })
      .then(ApiService.parseResponse)
      .then((offers) =>
        offers.map((offer) => this.#adapterService.adaptToClient(offer)),
      );
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `${Url.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adapterService.adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return this.#adapterService.adaptToClient(parsedResponse);
  }

  async addPoint(point) {
    const adapted = this.#adapterService.adaptToServer(point);
    delete adapted.id;

    const response = await this._load({
      url: Url.POINTS,
      method: Method.POST,
      body: JSON.stringify(adapted),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return this.#adapterService.adaptToClient(parsedResponse);
  }

  async removePoint(point) {
    const response = await this._load({
      url: `${Url.POINTS}/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }
}
