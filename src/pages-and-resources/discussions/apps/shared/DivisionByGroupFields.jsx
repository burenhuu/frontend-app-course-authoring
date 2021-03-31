import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import { Form, TransitionReplace } from '@edx/paragon';
import FormSwitchGroup from '../../../../generic/FormSwitchGroup';
import messages from './messages';

function DivisionByGroupFields({
  onBlur,
  onChange,
  intl,
  values,
}) {
  return (
    <>
      <h5>{intl.formatMessage(messages.divisionByGroup)}</h5>

      <FormSwitchGroup
        onChange={onChange}
        onBlur={onBlur}
        id="divideByCohorts"
        checked={values.divideByCohorts}
        label={intl.formatMessage(messages.divideByCohortsLabel)}
        helpText={intl.formatMessage(messages.divideByCohortsHelp)}
      />
      <TransitionReplace>
        {values.divideByCohorts ? (
          <React.Fragment key="open">
            <FormSwitchGroup
              onChange={onChange}
              onBlur={onBlur}
              className="ml-4"
              id="allowDivisionByUnit"
              checked={values.allowDivisionByUnit}
              label={intl.formatMessage(messages.allowDivisionByUnitLabel)}
              helpText={intl.formatMessage(messages.allowDivisionByUnitHelp)}
            />
            <FormSwitchGroup
              onChange={onChange}
              onBlur={onBlur}
              className="ml-4"
              id="divideCourseWideTopics"
              checked={values.divideCourseWideTopics}
              label={intl.formatMessage(messages.divideCourseWideTopicsLabel)}
              helpText={intl.formatMessage(messages.divideCourseWideTopicsHelp)}
            />
            <Form.Group className="ml-4">
              <Form.Check
                id="divideGeneralTopic"
                onChange={onChange}
                onBlur={onBlur}
                checked={values.divideGeneralTopic}
                label="General"
              />
              <Form.Check
                id="divideQuestionsForTAs"
                onChange={onChange}
                onBlur={onBlur}
                checked={values.divideQuestionsForTAs}
                label="Questions for the TAs"
              />
            </Form.Group>
          </React.Fragment>
        ) : <React.Fragment key="closed" />}
      </TransitionReplace>
    </>
  );
}

DivisionByGroupFields.propTypes = {
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
  values: PropTypes.shape({
    divideByCohorts: PropTypes.bool,
    allowDivisionByUnit: PropTypes.bool,
    divideCourseWideTopics: PropTypes.bool,
    divideGeneralTopic: PropTypes.bool,
    divideQuestionsForTAs: PropTypes.bool,
  }).isRequired,
};

export default injectIntl(DivisionByGroupFields);
