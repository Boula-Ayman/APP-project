export const PROPERTIES_STATUS = Object.freeze({
    available: 'available',
    soldOut: 'sold out',
    all: 'all'
});

export type PropertiesStatusKeys = keyof typeof PROPERTIES_STATUS