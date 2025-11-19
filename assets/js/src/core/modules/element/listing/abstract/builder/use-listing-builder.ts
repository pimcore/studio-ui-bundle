import { ListingBuilder } from "@Pimcore/modules/element/listing/abstract/builder/listing-builder";
import { useEffect, useState } from "react";

export interface UseListingBuilderProps {
  listingBuilder: ListingBuilder
}

export interface UseListingBuilderReturn {
  listingBuilder: ListingBuilder
  addDecorator: ListingBuilder['addDecorator']
  overrideDecorator: ListingBuilder['overrideDecorator']
  removeDecorator: ListingBuilder['removeDecorator']
  getDecorator: ListingBuilder['getDecorator']
  build: ListingBuilder['build']
}

export const useListingBuilder = ({ listingBuilder }: UseListingBuilderProps): UseListingBuilderReturn => {
  const [listingBuilderInstance, setListingBuilderInstance] = useState<ListingBuilder>(listingBuilder.copy());

  useEffect(() => {
    setListingBuilderInstance(listingBuilder.copy());
  }, [listingBuilder]);

  return {
    listingBuilder: listingBuilderInstance,
    addDecorator: listingBuilderInstance.addDecorator.bind(listingBuilderInstance),
    overrideDecorator: listingBuilderInstance.overrideDecorator.bind(listingBuilderInstance),
    removeDecorator: listingBuilderInstance.removeDecorator.bind(listingBuilderInstance),
    getDecorator: listingBuilderInstance.getDecorator.bind(listingBuilderInstance),
    build: listingBuilderInstance.build.bind(listingBuilderInstance)
  }
}

