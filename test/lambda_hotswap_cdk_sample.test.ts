import * as cdk from 'aws-cdk-lib';
import * as LambdaHotswapCdkSample from '../lib/lambda_hotswap_cdk_sample-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new LambdaHotswapCdkSample.LambdaHotswapCdkSampleStack(app, 'MyTestStack');
    // THEN
    const actual = app.synth().getStackArtifact(stack.artifactId).template;
    expect(actual.Resources ?? {}).toEqual({});
});
