import { injectIntl } from 'react-intl';
import { graphql, compose, gql } from 'react-apollo';
import PropTypes from 'prop-types';

import React from 'react';


const BasePropTypes = {
    identifier: PropTypes.string.isRequired,
}
class _RawTranslation extends React.Component {
    static propTypes = BasePropTypes;
    render() {

        const { children, getTranslationData, intl, identifier } = this.props;
        const { getTranslation, error } = getTranslationData;

        const value = getTranslation
            ? getTranslation.value.length > 0
                ? getTranslation.value
                : children
            : children;

        if (error) {
            console.error(error);
        }

        console.debug(`Translation:debug:${identifier}`, {
            getTranslationData,
            getTranslation,
        })

        return (
            value
        )
    }
}

class _TranslationWrapper extends _RawTranslation {
    static propTypes = {
        ...BasePropTypes,
        wrapper: PropTypes.node.isRequired,
        wrapperProps: PropTypes.object.isRequired
    }
    render() {
        const { wrapperProps, wrapper: Wrapper } = this.props;
        const response = super.render();
        return <Wrapper {...wrapperProps} >
            {response}
        </Wrapper>
    }
}

class Translation extends _RawTranslation {

    render() {
        const response = super.render();
        const { identifier } = this.props;
        const { locale } = this.props.intl;

        return (
            <span data-translation-key={`${identifier}.${locale}`}>{response}</span>
        )
    }
}

const c = compose(
    injectIntl,
    graphql(gql`
        query getTranslation($id: String!) {
          getTranslation(id: $id) {
            id
            value
          }
        }
      `, {
        name: 'getTranslationData',
        options: (props) => {
            const { identifier } = props;
            const { locale } = props.intl;

            return {
                ssr: false,
                variables: {
                    id: `${identifier}.${locale}`
                },
                skip: !identifier || !locale,
                fetchPolicy: "cache-first"
            }
        }
    })
);

export default c(Translation);
export const RawTranslation = c(_RawTranslation);
export const TranslationWrapper = c(_TranslationWrapper);
