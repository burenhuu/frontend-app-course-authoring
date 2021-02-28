import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { DataTable } from '@edx/paragon';

export default function FeaturesTable({ apps, features }) {
  return (
    <>
      <DataTable
        itemCount={features.length}
        data={features.map(feature => {
          const appCheckmarkCells = {};
          // DataTable wants 'data' to be an array of objects where each property of an object
          // represents a cell in that row, identified by its key.
          apps.forEach(app => {
            // If our app's set of feature Ids includes this feature, return a checkmark.
            // i.e, if this app has the current feature, check it!
            appCheckmarkCells[app.id] = app.featureIds.includes(feature.id) ? (
              <div key={`${app.id}&${feature.id}`}>
                <FontAwesomeIcon icon={faCheck} />
              </div>
            ) : null;
          });

          return {
            feature: feature.name, // 'feature' is the identifier for cells in the first column.
            // This is spreading the app IDs from appCheckmarkCells into the return array, creating
            // one object with 'feature' and the app.id keys from above.  The values are the JSX
            // above with the font awesome checkmarks in 'em
            ...appCheckmarkCells,
          };
        })}
        columns={[
          {
            Header: '',
            accessor: 'feature',
          },
          // We're converting our apps array into a bunch of objects with "Header" and "accessor"
          // keys, like DataTable expects.
          ...apps.map(app => ({
            Header: app.name,
            accessor: app.id,
          })),
        ]}
      >
        <DataTable.Table />
      </DataTable>
    </>
  );
}

FeaturesTable.propTypes = {
  apps: PropTypes.arrayOf(PropTypes.object).isRequired,
  features: PropTypes.arrayOf(PropTypes.object).isRequired,
};