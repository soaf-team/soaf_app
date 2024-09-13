import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import CodePush, { DownloadProgress } from "react-native-code-push";
import SplashScreen from "react-native-splash-screen";

const SPLASH_HIDE_DELAY = 300;
const NO_UPDATE_SPLASH_HIDE_DELAY = 1000;

type Props = {
  children: React.ReactNode;
};

const CodePushChecker = ({ children }: Props) => {
  const [isOpenUpdateSplash, setIsOpenUpdateSplash] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const hideSplashWithDelay = (delay: number) => {
    setTimeout(() => {
      SplashScreen.hide();
    }, delay);
  };

  const updateProgress = (progressData: DownloadProgress) => {
    const nextProgress = Number(
      progressData.receivedBytes / progressData.totalBytes
    );
    setProgress((prevProgress) => Math.max(prevProgress, nextProgress));
  };

  const checkCodePushUpdate = async () => {
    try {
      const update = await CodePush.checkForUpdate();

      if (update && !update.failedInstall) {
        setIsOpenUpdateSplash(true);
        hideSplashWithDelay(SPLASH_HIDE_DELAY);

        const newPackage = await update.download(updateProgress);
        await newPackage.install(CodePush.InstallMode.IMMEDIATE);
        CodePush.restartApp();
      } else {
        hideSplashWithDelay(NO_UPDATE_SPLASH_HIDE_DELAY);
      }
    } catch (error) {
      console.error(error);
    } finally {
      SplashScreen.hide();
      setIsOpenUpdateSplash(false);
    }
  };

  console.log(__DEV__);

  useEffect(() => {
    const init = async () => {
      if (__DEV__) {
        return;
      }
      checkCodePushUpdate();
    };
    init();
  }, []);

  if (isOpenUpdateSplash) {
    return (
      <View style={styles.container}>
        {/* <Image
          source={require("../../assets/images/splash.png")}
          style={styles.logo}
        /> */}
        {isOpenUpdateSplash && (
          <View style={styles.updateContainer}>
            <Text>{progress}%</Text>
            <View
              style={[styles.track, { backgroundColor: "#cccccc", height: 10 }]}
            >
              <View
                style={[
                  styles.progress,
                  {
                    backgroundColor: "#000",
                    width: `${progress * 100}%`,
                    height: 10,
                  },
                ]}
              />
            </View>
            <Text>잠시 업데이트를 진행할게요!</Text>
          </View>
        )}
      </View>
    );
  }

  return children;
};

export default CodePush(CodePushChecker);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    resizeMode: "contain",
    width: "100%",
  },
  updateContainer: {
    position: "absolute",
    bottom: 110,
    width: "100%",
    gap: 16,
    alignItems: "center",
    paddingHorizontal: 30,
  },
  track: {
    width: "100%",
    borderRadius: 9999,
    overflow: "hidden",
  },
  progress: {
    borderRadius: 9999,
  },
});
