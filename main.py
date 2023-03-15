# flask app을 생성합니다.
# 플라스크 앱, 즉 서버를 실행하는데 디버그 모드를 활성화하여 실행
from website import create_app
app = create_app()

if __name__ == '__main__':
	app.run('0.0.0.0', port=5000, debug=True)