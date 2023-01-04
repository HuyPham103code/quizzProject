package config

import(
	"time"
	"context"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type MongoInstance struct{
	Client   *mongo.Client
	DB       *mongo.Database
}

var MGConn *MongoInstance

var DBName = "Quizz_Project"
var MongURI = "mongodb://localhost:27017/" + DBName

//connect to mongodb
func Connect() error{
	//init new client
	client, err := mongo.NewClient(options.Client().ApplyURI(MongURI))
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	//check nil
	defer cancel()
	//set data
	err = client.Connect(ctx)
	db := client.Database(DBName)

	//check nil
	if err != nil{
		return err
	}
	//get data from mongodb
	MGConn = &MongoInstance{
		Client: client,
		DB: db,
	}
	return nil
}
