function collision(ball, target) {
  return (ballLeftInsideTargetRight(ball, target) &&
          ballRightInsideTargetLeft(ball, target) &&
          ballTopInsideTargetBottom(ball, target) &&
          ballBottomInsideTargetTop(ball, target)
        );
}

function ballLeftInsideTargetRight(ball, target) {
  return ball.x <= (target.x + target.width);
}

function ballRightInsideTargetLeft(ball, target) {
  return (ball.x + ball.width) >= target.x;
}

function ballTopInsideTargetBottom(ball, target) {
  return ball.y <= (target.y + target.height);
}

function ballBottomInsideTargetTop(ball, target) {
  return (ball.y + ball.height) >= target.y;
}

module.exports = collision;
