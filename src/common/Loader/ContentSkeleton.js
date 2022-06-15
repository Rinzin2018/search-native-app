import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function ContentSkeleton() {
  return (
    <SkeletonPlaceholder speed={1000} backgroundColor={'#c6c5c5'} highlightColor={'#fff'}>
      <SkeletonPlaceholder.Item flexDirection="row">
        <SkeletonPlaceholder.Item marginRight={10} width={150} height={100} borderRadius={4}/>
        <SkeletonPlaceholder.Item marginRight={10} width={150} height={100} borderRadius={4}/>
        <SkeletonPlaceholder.Item marginRight={10} width={100} height={100} borderRadius={4}/>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}

export default ContentSkeleton;
