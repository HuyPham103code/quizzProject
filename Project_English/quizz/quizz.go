package quizz
import(
	"golang-fiber/config"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)
//struct quizz
type Quizz struct {
	QuizzID     string     `json:"quizzID,omitempty" bson:"_id,omitempty"`
	Choose      bool       `json:"choose"`
	English     string     `json:"english"`
	Mean        string     `json:"mean"`  
	UserID      string 	   `json:"userid"`
}
//get all quizz with user ID
func GetAll(c *fiber.Ctx) error {
	mg := config.MGConn

	//conditions for filtering with userID
	userId := c.Params("userID")
	query := bson.D{{Key: "userid", Value: userId}}
	//find data with that conditiona nd name of collection
	cursor, err := mg.DB.Collection("Quizz").Find(c.Context(), query)
	if err != nil {
		return c.Status(500).SendString("Wrong find!")
	}

	var quizzs []Quizz = make([]Quizz, 0)
	//add all data to array
	if err := cursor.All(c.Context(), &quizzs); err != nil {
		return c.Status(500).SendString("Wrong cursor!")
	}
	//render array
	return c.JSON(quizzs)
}

//posst
func Post(c *fiber.Ctx) error {
	mg := config.MGConn
	//init collection
	collection := mg.DB.Collection("Quizz")

	newQuizz := new(Quizz)
	//tranfer from json to text
	if err := c.BodyParser(newQuizz); err != nil {
		return c.Status(400).SendString("Wrong parser")
	}
	newQuizz.QuizzID = ""
	//set new ID
	insertionResult, err := collection.InsertOne(c.Context(), newQuizz)

	if err != nil {
		return c.Status(500).SendString("Wrong insert")
	}

	filter := bson.D{{Key: "_id", Value: insertionResult.InsertedID}}
	createdRecord := collection.FindOne(c.Context(), filter)

	createQuizz := &Quizz{}
	//decode create quizz fron text to json
	createdRecord.Decode(createQuizz)

	return c.Status(201).JSON(createQuizz)
}

//Delete
func Delete(c *fiber.Ctx) error {
	//get id
	QuizzID, err := primitive.ObjectIDFromHex(c.Params("id"))

	if err != nil {
		return c.SendStatus(400)
	}

	query := bson.D{{Key: "_id", Value: QuizzID}}
	result, err := config.MGConn.DB.Collection("Quizz").DeleteOne(c.Context(), &query)

	if err != nil {
		return c.SendStatus(500)
	}

	if result.DeletedCount < 1 {
		return c.SendStatus(404)
	}
	//message deleted successfully
	return c.Status(200).JSON("record deleted successfully")
}

//Put Mongo
func Update(c *fiber.Ctx) error {
	idParam := c.Params("id")

	QuizzID, err := primitive.ObjectIDFromHex(idParam)

	if err != nil {
		return c.SendStatus(400)
	}

	quizz := new(Quizz)

	if err := c.BodyParser(quizz); err != nil {
		return c.Status(400).SendString(err.Error())
	}

	query := bson.D{{Key: "_id", Value: QuizzID}}
	update := bson.D{
		{Key: "$set",
			Value: bson.D{
				{Key: "english", Value: quizz.English},
				{Key: "choose", Value: quizz.Choose},
				{Key: "mean", Value: quizz.Mean},
			},
		},
	}

	err = config.MGConn.DB.Collection("Quizz").FindOneAndUpdate(c.Context(), query, update).Err()

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return c.SendStatus(400)
		}
		return c.SendStatus(500)
	}
	//gắn lại id cũ
	quizz.QuizzID = idParam

	return c.Status(200).JSON(quizz)
}

