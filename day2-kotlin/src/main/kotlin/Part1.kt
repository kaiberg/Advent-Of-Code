import kotlin.io.path.Path
import kotlin.io.path.forEachLine

fun Part1() {
    val maxRed = 12
    val maxBlue = 14
    val maxGreen = 13

    var sumPossibleIDS = 0;
    Path("input").forEachLine { line ->

        val rounds = line.split(";", ":");

        for (i in 1..rounds.count() - 1) {
            var red = 0;
            var blue = 0;
            var green = 0;
            val groups =  rounds[i].split(',').forEach { group ->

                val amount = group.substring(1, group.lastIndexOf(' ')).toInt()

                if(group.indexOf("green") != -1)
                    green+=amount
                if(group.indexOf("blue") != -1)
                    blue+=amount
                if(group.indexOf("red") != -1)
                    red+=amount

                if (red > maxRed || blue > maxBlue || green > maxGreen) {
                    return@forEachLine
                }
            }
        }
        val currentGameID = rounds[0].substring(5).toInt();
        sumPossibleIDS+= currentGameID;
    }

    println("Part 1: ${sumPossibleIDS}")

}