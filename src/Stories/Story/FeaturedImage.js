import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;

const FeaturedImage = ({ altText, featuredImage }) => {
  try {
    const data =
      featuredImage.media_details.sizes.large ||
      featuredImage.media_details.sizes.medium;

    return (
      <StyledImage
        alt={altText}
        src={data.source_url}
        width={data.width}
        height={data.height}
      />
    );
  } catch (e) {
    return null;
  }
};

FeaturedImage.propTypes = {
  altText: PropTypes.string.isRequired,
  featuredImage: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FeaturedImage;
