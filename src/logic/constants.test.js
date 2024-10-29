import {
  features,
  featureToLetterLookup,
  limitedFeatures,
  unlimitedFeatures,
  excludedFeatures,
} from "./constants";

test("featureToLetterLookup should have one entry for each feature in features", () => {
  const featureKeys = Object.keys(features);
  featureKeys.forEach((feature) => {
    expect(featureToLetterLookup).toHaveProperty(features[feature]);
  });
});

test("featureToLetterLookup should not have extra entries not in features", () => {
  const featureValues = Object.values(features);
  Object.keys(featureToLetterLookup).forEach((key) => {
    expect(featureValues).toContain(key);
  });
});

test("the unlimited and limited features (minus excluded features) should combine to equal all features", () => {
  const reconstructedFeatures = [
    ...limitedFeatures,
    ...unlimitedFeatures,
    ...excludedFeatures,
  ];

  expect(Object.values(features)).toEqual(
    expect.arrayContaining(reconstructedFeatures),
  );
  expect(reconstructedFeatures).toEqual(
    expect.arrayContaining(Object.values(features)),
  );

  excludedFeatures.forEach((excludedFeature) => {
    expect(unlimitedFeatures).not.toContain(excludedFeature);
    expect(limitedFeatures).not.toContain(excludedFeature);
  });
});
