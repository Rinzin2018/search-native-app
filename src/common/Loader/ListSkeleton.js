import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Dimensions} from 'react-native';

function ListSkeleton() {
  return (
    <SkeletonPlaceholder speed={1000} backgroundColor={'#c6c5c5'} highlightColor={'#fff'}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map(val => (
        <SkeletonPlaceholder.Item flexDirection="row" key={val}>
          <SkeletonPlaceholder.Item marginBottom={15} marginRight={12} width={50} height={50} borderRadius={4}/>
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item marginBottom={5} width={Dimensions.get('screen').width - 60} height={20}/>
            <SkeletonPlaceholder.Item width={Dimensions.get('screen').width - 170} height={10}/>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      ))}
    </SkeletonPlaceholder>
  );
}

export default ListSkeleton;
