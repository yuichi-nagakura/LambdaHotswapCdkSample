import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/lib/aws-lambda-nodejs';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/lib/aws-apigateway';

export class LambdaHotswapCdkSampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const nodejsLambdaPath = 'lambda-nodejs';

    const restApi = new RestApi(this, 'Api', {
      deployOptions: { stageName: 'dev' },
    });
    const resource = restApi.root.addResource(nodejsLambdaPath);
    const func = new NodejsFunction(this, 'NodejsFunction', {
      entry: 'src/function-nodejs/index.ts',
    });
    const integration = new LambdaIntegration(func);
    resource.addMethod('GET', integration);

    new CfnOutput(this, 'LambdaNodejsOutput', {
      value: restApi.url + nodejsLambdaPath,
    });
  }
}
