import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

import logger from './logger';

setOptions({ key: import.meta.env.VITE_GOOGLE_AUTOCOMPLETE || '' });

let autocompleteService: google.maps.places.AutocompleteService | null = null;
let placesService: google.maps.places.PlacesService | null = null;

type Prediction = google.maps.places.AutocompletePrediction;
type PlaceResult = google.maps.places.PlaceResult;

const initServices = async () => {
  if (autocompleteService && placesService) return;
  await importLibrary('places');
  autocompleteService = new google.maps.places.AutocompleteService();
  const div = document.createElement('div');
  placesService = new google.maps.places.PlacesService(div);
};

export const autocompleteWithLatLng = async (input: string) => {
  if (!input) return [];

  try {
    await initServices();

    const predictions = await new Promise<Prediction[]>((resolve, reject) => {
      autocompleteService!.getPlacePredictions(
        {
          input,
          componentRestrictions: { country: 'ng' },
          types: ['address'],
        },
        (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            resolve(results);
          } else {
            reject(new Error(`Autocomplete failed: ${status}`));
          }
        }
      );
    });

    return await Promise.all(
      predictions.map(async (prediction) => {
        try {
          const details = await new Promise<PlaceResult>((resolve, reject) => {
            placesService!.getDetails(
              {
                placeId: prediction.place_id,
                fields: ['geometry', 'address_components'],
              },
              (result, status) => {
                if (
                  status === google.maps.places.PlacesServiceStatus.OK &&
                  result
                ) {
                  resolve(result);
                } else {
                  reject(new Error(`Place details failed: ${status}`));
                }
              }
            );
          });

          const location = details.geometry?.location;
          const addressComponents = details.address_components || [];

          const findComponent = (type: string, short = false) =>
            addressComponents.find((c) => c.types.includes(type))?.[
              short ? 'short_name' : 'long_name'
            ] || '';

          return {
            description: prediction.description,
            place_id: prediction.place_id,
            lat: location?.lat() ?? null,
            lng: location?.lng() ?? null,
            streetAddress:
              findComponent('route') || findComponent('street_address'),
            streetNumber: findComponent('street_number'),
            city:
              findComponent('locality') ||
              findComponent('administrative_area_level_2'),
            state: findComponent('administrative_area_level_1'),
            stateCode: findComponent('administrative_area_level_1', true),
            region: findComponent('administrative_area_level_1'),
            postalCode: findComponent('postal_code'),
          };
        } catch (error) {
          logger(error);
          return {
            description: prediction.description,
            place_id: prediction.place_id,
            lat: null,
            lng: null,
            streetAddress: '',
            streetNumber: '',
            city: '',
            state: '',
            stateCode: '',
            region: '',
            postalCode: '',
          };
        }
      })
    );
  } catch (error) {
    logger(error);
    return [];
  }
};
