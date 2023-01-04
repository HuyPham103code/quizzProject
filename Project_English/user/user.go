package user
import(
	"golang-fiber/config"
	"github.com/gofiber/fiber/v2"
	"go.mongodb.org/mongo-driver/bson"
	//"go.mongodb.org/mongo-driver/bson/primitive"
	//"go.mongodb.org/mongo-driver/mongo"
)

type User struct {
	UserID     string       `json:"userID,omitempty" bson:"_id,omitempty"`
	UserName   string       `json:"username"`
	Password   string       `json:"password"`
}

//get all users
func GetUsers(c *fiber.Ctx) error {
	mg := config.MGConn
	passWord := c.Params("password")
	userName := c.Params("username")
	//điều kiện để lọc
	query := bson.D{{"username", userName}, {"password", passWord}}
	cursor, err := mg.DB.Collection("users").Find(c.Context(), query)
	if err != nil {
		return c.Status(500).SendString("Không tìm thấy")
	}

	var users []User = make([]User, 0)

	if err := cursor.All(c.Context(), &users); err != nil {
		return c.Status(500).SendString("không truyền vào được")
	}

	var userCurrent User
	for u, _ := range users {
		userCurrent = users[u]
	}
	return c.JSON(userCurrent) //trả về user login
}

//get name to check account has exit
func GetUserName(c *fiber.Ctx) error {
	mg := config.MGConn
	userName := c.Params("username")
	query := bson.D{{Key: "username", Value: userName}}

	cursor, err := mg.DB.Collection("users").Find(c.Context(), query)
	if err != nil {
		return c.Status(500).SendString("Can't find username")
	}

	var users []User = make([]User, 0)

	if err := cursor.All(c.Context(), &users); err != nil {
		return c.Status(500).SendString("Can't cursor username")
	}
	var username string
	for user, _ := range users {
		username = users[user].UserName
	}
	return c.JSON(username)
}
//Create a user
func Post(c *fiber.Ctx) error {
	mg := config.MGConn

	collection := mg.DB.Collection("users")
	//khai báo cấu trúc cho user mới
	newUser := new(User)

	if err := c.BodyParser(newUser); err != nil {
		return c.Status(400).SendString("Can't parser!")
	}

	newUser.UserID = ""
	//tiến hành thêm vào
	insertionResult, err := collection.InsertOne(c.Context(), newUser)

	if err != nil {
		return c.Status(500).SendString("Can't insert one")
	}
	//tiến hành lấy ra để render
	filter := bson.D{{Key: "_id", Value: insertionResult.InsertedID}}
	createdRecord := collection.FindOne(c.Context(), filter)

	createduser := &User{}
	createdRecord.Decode(createduser)

	return c.Status(201).JSON(createduser)
}


