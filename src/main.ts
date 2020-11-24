import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe());
  app.enableCors();










  //swagger option
  let Options;
  if(process.env.Noce_ENV ==='production'){
    Options = new DocumentBuilder().setTitle("captain api").addServer('/').setVersion('v1').addCookieAuth().build()
  }
  else{
Options = new  DocumentBuilder().setTitle("captain ").addServer('/').setVersion('v1').addBearerAuth().build()
  }
 const document = SwaggerModule.createDocument(app,Options,{ignoreGlobalPrefix:true,include:[AppModule]});
 SwaggerModule.setup('/explorer',app,document);

 
 
 
  await app.listen(process.env.PORT || 4000);
  console.log('http://localhost:4000/explorer/#/')
}
bootstrap();
