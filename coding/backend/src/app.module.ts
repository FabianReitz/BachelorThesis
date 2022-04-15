import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { TodosController } from './todos/todos.controller';
import { TodosModule } from './todos/todos.module';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost:27017'), TodosModule],
    controllers: [
        // AppController,
        TodosController,
    ],
    // providers: [AppService],
})
export class AppModule {}
