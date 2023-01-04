package main
import(
	"golang-fiber/quizz"
	"golang-fiber/user"
	//"golang-fiber/router"
	"golang-fiber/config"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func RoutesTodos(app *fiber.App){
	//get all todos of user
	app.Get("/quizz/:userID", quizz.GetAll)//GetMongo GetAll
	//app.Get("/book/:id", quizz.Get)
	app.Post("/quizz", quizz.Post)
	app.Delete("/quizz/:id", quizz.Delete)
	app.Put("/quizz/:id", quizz.Update)
}

func RoutesUser(app *fiber.App) {
	
	//check signup
	app.Get("/user/:username", user.GetUserName)
	//check login
	app.Get("/user/:username/:password", user.GetUsers)
	//create a user
	app.Post("/user", user.Post)

	//app.Put("/user/:id", user.Put)

	//app.Delete("/user/:id", user.Delete)
}
func main(){
	app := fiber.New()
	//handle issues CORS
	app.Use(cors.New())
	//mongodb
	config.Connect()
	//handle CRUD
	// router.setupQuizz(app)
	// router.SetupUser(app)
	//func
	RoutesTodos(app)
	RoutesUser(app)
	app.Listen(":3000")
}


